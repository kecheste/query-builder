import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/@/components/ui/dropdown-menu";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { EDGE_TYPES } from "./schema";

function useEdgeState(data: any, type: string) {
  const [parameters, setParameters] = useState<any>(data.formData);

  useEffect(() => {
    setParameters({});
  }, [type]);

  const parametersToShowInSummary: { key: string; value: any }[] =
    useMemo(() => {
      if (!parameters) return [];
      const EXCLUDED_KEYS = ["type", "error", "warning"];
      return Object.keys(parameters)
        .filter((k) => !EXCLUDED_KEYS.includes(k) && parameters[k])
        .map((k) => ({ key: k, value: parameters[k] }));
    }, [parameters]);

  return {
    parameters,
    parametersToShowInSummary,
  };
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const {
    edgeType,
    options,
  }: { edgeType: string; options: typeof EDGE_TYPES } = data as any;
  const [type, setType] = useState(edgeType || options[0].label);
  const { parametersToShowInSummary } = useEdgeState(data, type);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { setEdges } = useReactFlow();

  function deleteEdge() {
    setEdges((edgs) => edgs.filter((e) => e.id !== id));
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-75%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan flex"
        >
          {parametersToShowInSummary.length > 0 && (
            <ul className="absolute bottom-full left-1/4 whitespace-nowrap rounded-xl bg-foreground/5 p-2 px-4 font-mono text-xs text-foreground/70">
              {parametersToShowInSummary.map((p) => (
                <li key={p.key}>
                  {p.key}: {p.value}
                </li>
              ))}
            </ul>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="rounded bg-background text-xs">
                {type} <ChevronDown size={12} className="inline" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{type}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {options.length > 1 && (
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Change connection type
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          onValueChange={setType}
                          value={type}
                        >
                          {options.map((o) => (
                            <DropdownMenuRadioItem
                              key={o.label}
                              value={o.label}
                            >
                              {o.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              )}
              <DropdownMenuItem className="text-red-600" onClick={deleteEdge}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
