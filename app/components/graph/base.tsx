import cytoscape from "cytoscape";
import elk from "cytoscape-elk";
import cytoscapePopper from "cytoscape-popper";
import nodeHtmlLabel from "cytoscape-node-html-label";
import saver from "file-saver";
import { ReferenceElement } from "@floating-ui/core";
import { computePosition, flip, shift, limitShift } from "@floating-ui/dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/@/components/ui/button";
import { Camera, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/@/components/ui/tooltip";
import html2canvas from "html2canvas";

cytoscape.use(elk);
cytoscape.use(nodeHtmlLabel);
cytoscape.use(cytoscapePopper(popperFactory));

interface PopperInstance {
  update: () => void;
}

function popperFactory(
  ref: ReferenceElement,
  content: any,
  opts: any,
): PopperInstance {
  const popperOptions = {
    middleware: [flip(), shift({ limiter: limitShift() })],
    ...opts,
  };
  function update() {
    computePosition(ref, content, popperOptions).then(({ x, y }) => {
      Object.assign(content.style, {
        left: `${x}px`,
        top: `${y + 15}px`,
      });
    });
  }
  update();
  return { update };
}

function CytoscapeBaseGraph({
  graphProps,
  NodeContextMenu,
  onRender,
}: {
  graphProps: cytoscape.CytoscapeOptions;
  NodeContextMenu?: React.FC<{
    menuRef: React.RefObject<HTMLDivElement>;
    selectedNode: any;
  }>;
  onRender?: (graph: cytoscape.Core) => void;
}) {
  const graph = useRef<cytoscape.Core>();
  const container = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const popperRef = useRef<PopperInstance>();
  const [selectedNode, setSelectedNode] = useState<any>();

  useEffect(() => {
    if (!container.current) return;
    const { layout, ...otherProps } = graphProps;
    graph.current = cytoscape({
      container: container.current,
      layout,
      ...otherProps,
    });

    graph.current.layout(layout || { name: "preset" }).run();

    graph.current.on("pan zoom resize", () => popperRef.current?.update());
    graph.current.nodes().on("select", (e: any) => {
      setSelectedNode(e.target);
    });
    graph.current.nodes().on("position", (e: any) => {
      popperRef.current?.update();
    });
    graph.current.nodes().on("unselect", (e: any) => {
      setSelectedNode(null);
    });
    onRender?.(graph.current);
  }, [graphProps.elements, graphProps.style]);

  useEffect(() => {
    if (!selectedNode || !menu.current) return;
    popperRef.current = selectedNode.popper({
      content: menu.current,
    });
    popperRef.current?.update();
  }, [selectedNode, menu.current]);

  return (
    <>
      <div ref={container} className="h-full w-full bg-background"></div>
      {NodeContextMenu && selectedNode && (
        <NodeContextMenu menuRef={menu} selectedNode={selectedNode} />
      )}
      <div className="absolute bottom-6 left-12 flex rounded-full border bg-background/60 p-1 px-6">
        <Tooltip>
          <TooltipTrigger className="p-0">
            <Button
              className="me-2"
              size="icon"
              variant="link"
              onClick={() => {
                html2canvas(container.current!).then((canvas) => {
                  saver(canvas.toDataURL(), "graph-image.jpeg");
                });
              }}
            >
              <Camera className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Save graph as image</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="p-0">
            <Button
              size="icon"
              variant="link"
              onClick={() => {
                var jsonBlob = new Blob(
                  [JSON.stringify(graph.current?.json())],
                  {
                    type: "application/javascript;charset=utf-8",
                  },
                );
                saver(jsonBlob, "graph-data.json");
              }}
            >
              <Download className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Save graph JSON</TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}

export default CytoscapeBaseGraph;
