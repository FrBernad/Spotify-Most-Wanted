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
          return this.getData("title").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
          ;
        }

        return this.getData("name").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        ;
      });

      this.currentGraph.nodes().labels().fontSize(12);
      this.currentGraph.nodes().labels().fontWeight(600);
      this.currentGraph.nodes().labels().fontFamily("ReadexPro");

      // configure labels of nodes in groups
      if (data.nodes.length > 1) {
        this.currentGraph.group("SONG").labels().fontColor("#ffa000");
        this.currentGraph.group("SONG").fill("rgba(193,55,42,0.7)");
        this.currentGraph.group("SONG").shape("star10");
      }

      this.currentGraph.group("ARTIST").labels().fontColor("#ffffff");
      this.currentGraph.group("ARTIST").fill("rgba(0,0,0,0.7)");

      this.currentGraph.nodes().height(30);
      this.currentGraph.nodes().selected().height(40);
      this.currentGraph.nodes().selected().stroke("rgb(247, 116, 60)", 2);
      this.currentGraph.nodes().stroke("white", 2);
      this.currentGraph.nodes().hovered().stroke("rgb(247, 116, 60)", 2);

      // configure tooltips
      this.currentGraph.tooltip().useHtml(true);
      this.currentGraph.tooltip().fontFamily("ReadexPro");

      this.currentGraph.tooltip().format(function () {
        if (this.type == "node") {
          if (this.getData("group") === "SONG") {
            return `
                    <p>
                        <span style='font-weight:bold'>Title: </span>${this.getData("title").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </p>
                    <p>
                        <span style='font-weight:bold'>Album: </span>${this.getData("album").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </p>
                    <p>
                        <span style='font-weight:bold'>Genre: </span>${this.getData("genre").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </p>`;
          }
          return `
                    <p>
                        <span style='font-weight:bold'>Name: </span>${this.getData("name").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}
                    </p>
                    <p>
                        <span style='font-weight:bold'>Followers: </span>${this.getData("followers")}
                    </p>
                    `;
        } else {
          return `${this.getData("label")}`;
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
          label: rel.label === "CO_ARTIST" ? "Co-Artist" : "Main Artist"
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
    } else {
      this.selectedArtist = this.query.artist;
    }

  }

  ngOnDestroy(): void {
    if (!!this.relationsSub) {
      this.relationsSub.unsubscribe();
    }
  }


}
