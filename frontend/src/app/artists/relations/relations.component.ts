import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationResult} from "../../models/pagination-result.model";
import {ArtistPaginationQuery, ArtistRelationQuery, SearchService} from "../../search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {Subscription} from "rxjs";
import {PaginationUtils} from "../../utils/pagination-utils";
import {Relation} from "../../models/relation.model";

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.scss']
})
export class RelationsComponent implements OnInit, OnDestroy {
  response: Relation = {
    nodes: [],
    rels: []
  }

  query: ArtistRelationQuery = {
    artist: "",
    size: 10
  }

  selectedArtist: string = ""

  isLoading = false;

  currentGraph = null;

  private relationsSub: Subscription;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((_) => {
      this.parseQueryParams();
      if (this.query.artist) {
        this.isLoading = true;
        this.spinner.show();
        this.searchService.getArtistRelations(this.query);
      }
    })

    this.relationsSub = this.searchService.relations.subscribe(
      (results) => {
        this.response = results;
        this.clearGraph();
        this.generateRelationGraph();
        if (this.isLoading) {
          this.spinner.hide().then(() => this.isLoading = false);
        }
      });
  }

  private clearGraph() {
    if (this.currentGraph) {
      const container = document.getElementById("graphContainer");
      container.removeChild(container.childNodes[0]);
      this.currentGraph = null;
    }
  }

  private generateRelationGraph() {
    this.clearGraph();

    const data = this.parseGraphData();

    // create a chart and set the data
    this.currentGraph = anychart.graph(data);

    if (data.nodes.length > 0) {

      // enable labels of nodes
      this.currentGraph.nodes().labels().enabled(true);

      // configure labels of nodes
      this.currentGraph.nodes().labels().format(function () {
        if (this.getData("group") === "SONG") {
          return this.getData("title").toUpperCase();
        }

        return this.getData("name").toUpperCase();
      });

      this.currentGraph.nodes().labels().fontSize(12);
      this.currentGraph.nodes().labels().fontWeight(600);

      // configure labels of nodes in groups
      if (data.nodes.length > 1) {
        this.currentGraph.group("SONG").labels().fontColor("#ffa000");
      }
      this.currentGraph.group("ARTIST").labels().fontColor("#ffffff");

      // configure tooltips
      this.currentGraph.tooltip().useHtml(true);
      this.currentGraph.tooltip().format(function () {
        if (this.type == "node") {
          if (this.getData("group") === "SONG") {
            return `<span style='font-weight:bold'>${this.getData("title")}</span>`;
          }
          return `<span style='font-weight:bold'>name: ${this.getData("name")}</span>`;
        } else {
          return `${this.getData("from")} -- ${this.getData("label")} --> ${this.getData("to")}`;
        }
      });

    }

    // set the container id
    this.currentGraph.container("graphContainer");

    this.currentGraph.background().fill("rgba(255, 255, 255, .1)");

    this.currentGraph.background().corners(8, 8, 8, 8);

    this.currentGraph.draw();
  }


  onChangeArtist(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.onSearch();
    }
  }

  onSearch() {
    this.query.artist = this.selectedArtist;
    this.updateRoute();
  }

  private parseGraphData() {

    const nodes = this.response.nodes.map(
      node => {
        if (node.labels.includes("Song")) {
          return {
            id: node.id,
            group: "SONG",
            ...node.properties
          };
        } else if (node.labels.includes("Artist")) {
          return {
            id: node.id,
            group: "ARTIST",
            ...node.properties
          }
        }
      }
    );

    const edges = this.response.rels.map(
      rel => {
        return {
          from: rel.start.id,
          to: rel.end.id,
          label: rel.label
        }
      }
    )

    return {
      nodes, edges
    }

  }

  private updateRoute() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {...this.query},
        replaceUrl: false
      });
  }

  private parseQueryParams() {
    const params = this.route.snapshot.queryParams;

    this.query = {
      ...this.query,
      ...params
    }

    if (params["size"]) {
      this.query.size = Number.parseInt(params["size"])
      this.query.size = isNaN(this.query.size) ? 6 : this.query.size;
    } else {
      this.query.size = 6
    }

    if (!params["artist"]) {
      delete this.query.artist;
    }

  }

  ngOnDestroy(): void {
    if (!!this.relationsSub) {
      this.relationsSub.unsubscribe();
    }
  }


}
