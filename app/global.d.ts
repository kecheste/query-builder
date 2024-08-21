declare module "cytoscape-elk";
declare module "cytoscape-node-html-label";

interface HypothesisListItem {
  id: string;
  variant: string;
  phenotype: string;
  cell: string;
  network: string;
  causal_gene?: string;
  created_on: string;
  generating?: boolean;
}

interface HypothesisData {
  id: string;
  variant: string;
  phenotype: string;
  cell: string;
  network: string;
  gene?: string;
  created_on: string;
  GO_terms?: {
    causal_gene: string;
    causal_graph: {
      nodes: { id: string; type: string }[];
      edges: { source: string; target: string; label: string }[];
    };
    GO: HypothesisGOList;
  };
  generating?: boolean;
}

interface HypothesisGOList {
  ID: string[];
  Name: string[];
  Reason: string[];
  "Adjusted P-value": number[];
  Genes: string[];
}

interface GOInformation {
  id: string;
  name: string;
  reason: string;
  p: number;
  genes: string;
}

interface MessageData {
  id: number;
  content: string;
  timestamp: Date;
  isResponse: boolean;
  hasError?: boolean;
}

interface ChatState {
  isOpen?: boolean;
  isBusy: boolean;
  messages: MessageData[];
}

interface ChatContextValue {
  chatState: ChatState;
  sendPrompt: function;
  resendPrompt: function;
  setChatPopupVisibility: function;
}

interface IconProperties {
  fillColor?: string;
  strokeColor?: string;
  size?: number;
  children?: ReactNode;
}

interface NodeProps {
  id: string;
  name: string;
  icon: React.FC<{ size?: number }>;
  iconWrapperClass: string;
  summaryWrapperClass: string;
  formHeaderClass: string;
  data?: any;
}

interface NodeSchema {
  [k: string]: {
    props: NodeProps;
    parent: CATEGORIES;
  };
}

interface HypothesisGraph {
  summary: string;
  graph: {
    nodes: { id: string; type: string; name: string }[];
    edges: { label: string; source: string; target: string }[];
  };
}

interface Window {
  ENV: {
    API_URL: stirng;
  };
}
