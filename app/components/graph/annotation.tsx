import { Stylesheet } from "cytoscape";
import { Button } from "~/@/components/ui/button";
import { Sparkles } from "lucide-react";
import CytoscapeBaseGraph from "./base";
import { useMemo } from "react";
import { Theme, useTheme } from "remix-themes";
import colors from "tailwindcss/colors";

const LAYOUT = {
  name: "elk",
  elk: {
    algorithm: "layered",
    "spacing.nodeNodeBetweenLayers": 400,
    "spacing.componentComponent": 300,
  },
};

const COLOR_MAPPING = {
  gene: colors.purple[500],
  protein: colors.violet[500],
  exon: colors.indigo[500],
  transcript: colors.blue[500],
  snp: colors.pink[500],
  sv: colors.pink[500],
  enhancer: colors.yellow[500],
  super_enhancer: colors.yellow[500],
  promoter: colors.orange[500],
  ncrna: colors.amber[500],
  pathway: colors.amber[500],
  go: colors.emerald[500],
  uberon: colors.emerald[500],
  clo: colors.emerald[500],
  cl: colors.emerald[500],
  efo: colors.emerald[500],
  bto: colors.emerald[500],
  motif: colors.lime[500],
  tad: colors.rose[500],
};

export default ({ data, onExplainNode }: any) => {
  const [theme] = useTheme();

  const STYLE: Stylesheet[] = useMemo(() => {
    return [
      {
        selector: "node",
        style: {
          label: "data(id)",
          "font-family": "monospace",
        },
      },
      {
        selector: "edge",
        style: {
          label: "data(label)",
          "font-family": "monospace",
          "text-outline-color":
            theme == Theme.DARK ? colors.slate[950] : colors.white,
          "text-outline-width": 5,
          "target-arrow-shape": "chevron",
          "arrow-scale": 2,
          "curve-style": "bezier",
          "line-color": colors.slate[theme == Theme.DARK ? 600 : 300],
          "target-arrow-color": colors.slate[theme == Theme.DARK ? 600 : 300],
          color: theme == Theme.DARK ? colors.white : colors.black,
        },
      },
      ...Object.keys(COLOR_MAPPING).map((k) => ({
        selector: `node[type="${k}"]`,
        style: {
          "background-color": (COLOR_MAPPING as any)[k],
          color: theme == Theme.DARK ? colors.white : colors.black,
        },
      })),
    ];
  }, [theme]);

  const ContextMenu = ({
    menuRef,
    selectedNode,
  }: {
    menuRef: React.RefObject<HTMLDivElement>;
    selectedNode: any;
  }) => (
    <div
      ref={menuRef}
      className="absolute rounded-md bg-primary text-xs text-background/65"
    >
      <p className="p-2 font-mono">
        {selectedNode?.data().name || selectedNode?.data().id}
      </p>
      <Button
        onClick={() =>
          onExplainNode(
            `Explain ${selectedNode?.data().type} "${selectedNode?.data().name || selectedNode?.data().id}"`,
          )
        }
      >
        <Sparkles className="me-2 inline h-4 w-4" /> Explain this node
      </Button>
    </div>
  );

  return (
    <>
      <CytoscapeBaseGraph
        graphProps={{
          elements: data.elements,
          layout: LAYOUT,
          style: STYLE,
        }}
        NodeContextMenu={ContextMenu}
      />
    </>
  );
};
