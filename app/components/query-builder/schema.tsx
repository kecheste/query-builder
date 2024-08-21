import {
  BTOIcon,
  CLIcon,
  CLOIcon,
  EFOIcon,
  EnhancerIcon,
  ExonIcon,
  GOIcon,
  GeneIcon,
  MotifIcon,
  NonCodingRNAIcon,
  PathwayIcon,
  PromoterIcon,
  ProteinIcon,
  SNPIcon,
  SVIcon,
  SuperEnhancerIcon,
  TADIcon,
  TranscriptIcon,
  UberonIcon,
} from "./icons";

enum CATEGORIES {
  coding = "Coding / Coded elements",
  variant = "Genomic variant",
  noncoding = "Non-coding elements",
  process = "Biological process",
  ontology = "Ontology term",
  threeD = "3d genome structure",
  epigenomic = "Epigenomic feature",
}

export const NODE_SCHEMA: NodeSchema = {
  gene: {
    props: {
      id: "gene",
      name: "Gene",
      icon: GeneIcon,
      iconWrapperClass: "bg-purple-500",
      summaryWrapperClass: "bg-purple-100 text-purple-700",
      formHeaderClass: "bg-purple-700",
    },
    parent: CATEGORIES.coding,
  },
  protein: {
    props: {
      id: "protein",
      name: "Protein",
      icon: ProteinIcon,
      iconWrapperClass: "bg-violet-500",
      summaryWrapperClass: "bg-violet-100 text-violet-700",
      formHeaderClass: "bg-violet-500",
    },
    parent: CATEGORIES.coding,
  },
  exon: {
    props: {
      id: "exon",
      name: "Exon",
      icon: ExonIcon,
      iconWrapperClass: "bg-indigo-500",
      summaryWrapperClass: "bg-indigo-100 text-indigo-700",
      formHeaderClass: "bg-indigo-500",
    },
    parent: CATEGORIES.coding,
  },
  transcript: {
    props: {
      id: "transcript",
      name: "Transcript",
      icon: TranscriptIcon,
      iconWrapperClass: "bg-blue-500",
      summaryWrapperClass: "bg-blue-100 text-blue-700",
      formHeaderClass: "bg-blue-500",
    },
    parent: CATEGORIES.coding,
  },
  snp: {
    props: {
      id: "snp",
      name: "SNP",
      icon: SNPIcon,
      iconWrapperClass: "bg-pink-500",
      summaryWrapperClass: "bg-pink-100 text-pink-700",
      formHeaderClass: "bg-pink-500",
    },
    parent: CATEGORIES.variant,
  },
  sv: {
    props: {
      id: "sv",
      name: "Structural variant",
      icon: SVIcon,
      iconWrapperClass: "bg-pink-500",
      summaryWrapperClass: "bg-pink-100 text-pink-700",
      formHeaderClass: "bg-pink-500",
    },
    parent: CATEGORIES.variant,
  },
  enhancer: {
    props: {
      id: "enhancer",
      name: "Enhancer",
      icon: EnhancerIcon,
      iconWrapperClass: "bg-yellow-500",
      summaryWrapperClass: "bg-yellow-100 text-yellow-700",
      formHeaderClass: "bg-yellow-500",
    },
    parent: CATEGORIES.noncoding,
  },
  super_enhancer: {
    props: {
      id: "super_enhancer",
      name: "Super enhancer",
      icon: SuperEnhancerIcon,
      iconWrapperClass: "bg-yellow-500",
      summaryWrapperClass: "bg-yellow-100 text-yellow-700",
      formHeaderClass: "bg-yellow-500",
    },
    parent: CATEGORIES.noncoding,
  },
  promoter: {
    props: {
      id: "promoter",
      name: "Promoter",
      icon: PromoterIcon,
      iconWrapperClass: "bg-orange-500",
      summaryWrapperClass: "bg-orange-100 text-orange-700",
      formHeaderClass: "bg-orange-500",
    },
    parent: CATEGORIES.noncoding,
  },
  ncrna: {
    props: {
      id: "ncrna",
      name: "Non-coding RNA",
      icon: NonCodingRNAIcon,
      iconWrapperClass: "bg-amber-500",
      summaryWrapperClass: "bg-amber-100 text-amber-700",
      formHeaderClass: "bg-amber-500",
    },
    parent: CATEGORIES.noncoding,
  },
  pathway: {
    props: {
      id: "pathway",
      name: "Pathway",
      icon: PathwayIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.process,
  },
  go: {
    props: {
      id: "go",
      name: "GO",
      icon: GOIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  uberon: {
    props: {
      id: "uberon",
      name: "Uberon",
      icon: UberonIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  clo: {
    props: {
      id: "clo",
      name: "CLO",
      icon: CLOIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  cl: {
    props: {
      id: "cl",
      name: "CL",
      icon: CLIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  efo: {
    props: {
      id: "efo",
      name: "EFO",
      icon: EFOIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  bto: {
    props: {
      id: "bto",
      name: "BTO",
      icon: BTOIcon,
      iconWrapperClass: "bg-emerald-500",
      summaryWrapperClass: "bg-emerald-100 text-emerald-700",
      formHeaderClass: "bg-emerald-500",
    },
    parent: CATEGORIES.ontology,
  },
  motif: {
    props: {
      id: "motif",
      name: "Motif",
      icon: MotifIcon,
      iconWrapperClass: "bg-lime-500",
      summaryWrapperClass: "bg-lime-100 text-lime-700",
      formHeaderClass: "bg-lime-500",
    },
    parent: CATEGORIES.epigenomic,
  },
  tad: {
    props: {
      id: "tad",
      name: "TAD",
      icon: TADIcon,
      iconWrapperClass: "bg-rose-500",
      summaryWrapperClass: "bg-rose-100 text-rose-700",
      formHeaderClass: "bg-rose-500",
    },
    parent: CATEGORIES.threeD,
  },
};

export const EDGE_TYPES = [
  {
    type: "transcribed to",
    label: "transcribed_to",
    source: "gene",
    target: "transcript",
  },
  {
    type: "transcribed from",
    label: "transcribed_from",
    source: "transcript",
    target: "gene",
  },
  {
    type: "translates to",
    label: "translates_to",
    source: "transcript",
    target: "protein",
  },
  {
    type: "translation of",
    label: "translation_of",
    source: "protein",
    target: "transcript",
  },
  {
    type: "gene to gene coexpression association",
    label: "coexpressed_with",
    source: "gene",
    target: "gene",
  },
  {
    type: "post translational interaction",
    label: "interacts_with",
    source: "protein",
    target: "protein",
  },
  {
    type: "cl capable of",
    label: "cl_capable_of",
    source: "cl",
    target: "go",
  },
  {
    type: "cl part of",
    label: "cl_part_of",
    source: "cl",
    target: "uberon",
  },
  {
    type: "gene to pathway association",
    label: "genes_pathways",
    source: "gene",
    target: "pathway",
  },
  {
    type: "parent pathway of",
    label: "parent_pathway_of",
    source: "pathway",
    target: "pathway",
  },
  {
    type: "child pathway of",
    label: "child_pathway_of",
    source: "pathway",
    target: "pathway",
  },
  {
    type: "bto subclass of",
    label: "bto_subclass_of",
    source: "bto",
    target: "bto",
  },
  {
    type: "efo subclass of",
    label: "efo_subclass_of",
    source: "efo",
    target: "efo",
  },
  {
    type: "uberon subclass of",
    label: "uberon_subclass_of",
    source: "uberon",
    target: "uberon",
  },
  {
    type: "clo subclass of",
    label: "clo_subclass_of",
    source: "clo",
    target: "clo",
  },
  {
    type: "cl subclass of",
    label: "cl_subclass_of",
    source: "cl",
    target: "cl",
  },
  {
    type: "go subclass of",
    label: "go_subclass_of",
    source: "go",
    target: "go",
  },
  {
    type: "go gene product",
    label: "go_gene_product",
    source: "go",
    target: "protein",
  },
  {
    type: "go gene",
    label: "go_gene",
    source: "gene",
    target: "go",
  },
  {
    type: "go rna",
    label: "go_rna",
    source: "ncrna",
    target: "go",
  },
  {
    type: "enhancer to gene association",
    label: "enhancer_gene",
    source: "enhancer",
    target: "gene",
  },
  {
    type: "promoter to gene association",
    label: "promoter_gene",
    source: "promoter",
    target: "gene",
  },
  {
    type: "super enhancer to gene association",
    label: "super_enhancer_gene",
    source: "super_enhancer",
    target: "gene",
  },
  {
    type: "transcription factor to gene association",
    label: "tf_gene",
    source: "gene",
    target: "gene",
  },
  {
    type: "regulatory region to gene association",
    label: "regulatory_region_gene",
    source: "regulatory_region",
    target: "gene",
  },
  {
    type: "gtex variant to gene expression association",
    label: "gtex_variant_gene",
    source: "snp",
    target: "gene",
  },
  {
    type: "upstream gene to variant association",
    label: "upstream_gene",
    source: "snp",
    target: "gene",
  },
  {
    type: "downstream gene to variant association",
    label: "downstream_gene",
    source: "snp",
    target: "gene",
  },
  {
    type: "in gene to variant association",
    label: "in_gene",
    source: "snp",
    target: "gene",
  },
  {
    type: "topld in linkage disequilibrium with",
    label: "in_ld_with",
    source: "snp",
    target: "snp",
  },
  {
    type: "transcription factor to snp association",
    label: "tfbs_snp",
    source: "gene",
    target: "snp",
  },
  {
    type: "gene in tad region",
    label: "in_tad_region",
    source: "gene",
    target: "tad",
  },
  {
    type: "activity by contact",
    label: "activity_by_contact",
    source: "snp",
    target: "gene",
  },
  {
    type: "chromatin state",
    label: "chromatin_state",
    source: "snp",
    target: "uberon",
  },
  {
    type: "dnase I hotspot",
    label: "in_dnase_I_hotspot",
    source: "snp",
    target: "uberon",
  },
  {
    type: "histone modification",
    label: "histone_modification",
    source: "snp",
    target: "uberon",
  },
];

export function getEdgebyType(type: string) {
  return EDGE_TYPES.find((e) => e.label === type);
}

export function getAllEdgesForNodesTypes(
  sourceNodeType: string,
  targetNodeType: string
) {
  const edgeOptions = EDGE_TYPES.filter(
    (e) => e.source === sourceNodeType && e.target === targetNodeType
  );
  return edgeOptions;
}
