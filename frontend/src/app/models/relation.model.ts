interface Node {
  type: string,
  id: string,
  labels: string[],
  properties;
}

interface Relationship {
  id: string,
  type: string,
  label: string,
  start: {
    id: string,
    labels: string[]
  },
  end: {
    id: string,
    labels: string[]
  }
}

export class Relation {
  constructor(
    public nodes: Node[],
    public rels: Relationship[]
  ) {
  }
}
