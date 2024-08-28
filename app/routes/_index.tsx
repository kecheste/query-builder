import type { MetaFunction } from "@remix-run/node";
import {
  ClientLoaderFunction,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { EDGE_TYPES } from "~/components/query-builder/schema";
import QueryBuilder from "~/components/query-builder";
// import postRobot from "post-robot"  #uninstall this package

export const meta: MetaFunction = () => {
  return [
    { title: "Query Builder" },
    { name: "description", content: "Rejuve.bio hypothesis generation" },
  ];
};

function  trialFunc(message:any){
  const targetOrigin = "http://127.0.0.1:8081"
  window.parent.postMessage(message, targetOrigin)
}

export const clientLoader: ClientLoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const templateId = url.searchParams.get("template");
  if (templateId) {
    const response = await fetch(
      `https://www.mock.com/annotation/templates/${templateId}`
    );
    const template = await response.json();
    return { template };
  }
  return {};
};

export default () => {
  const navigate = useNavigate();
  const { template }: any = useLoaderData<typeof clientLoader>();

  const runQuery = async (graph: any) => {
    const requestJSON = {
      requests: {
        nodes: graph.nodes.map((n: any) => {
          return {
            node_id: n.id,
            id: n.data.id || "",
            type: n.data.type,
            properties: Object.keys(n.data)
              .filter((k) => k != "id" && k != "type" && n.data[k])
              .reduce((acc, k) => ({ ...acc, [k]: n.data[k] }), {}),
          };
        }),
        predicates: graph.edges.map((e: any) => {
          return {
            type: EDGE_TYPES.find((t) => t.label === e.data.edgeType)?.type,
            source: e.source,
            target: e.target,
          };
        }),
      },
    };

    // const response = await fetch("http://localhost:5000/query", {
    //   method: "POST",
    //   body: JSON.stringify(requestJSON),
    //   headers: new Headers({ "content-type": "application/json" }),
    // });
    // const resultGraph = await response.json();
    // if (!resultGraph?.nodes?.length) {
    //   return alert("No matching result for the query.");
    // }
    const resultGraph = {
      "nodes": [
          {
            "node_id": "n1",
            "id": "",
            "type": "gene",
            "properties": {}
          },
          {
            "node_id": "n2",
            "id": "",
            "type": "transcript",
            "properties": {}
          },
          {
            "node_id": "n3",
            "id": "",
            "type": "protein",
              "properties": {
              "protein_name": "MKKS"
            }
          },
          {
            "node_id": "n4",
            "id": "",
            "type": "protein",
              "properties": {
              "protein_name": "MKKS"
            }
          }
        ],
        "predicates": [
          {
            "type": "transcribed to",
            "source": "n1",
            "target": "n2"
          },
          {
            "type": "translates to",
            "source": "n2",
            "target": "n3"
          }
        ]
      }

    trialFunc({
      resultGraph
    })
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-screen flex-col">
        <header className="border-b px-12 py-4">
          <h1 className="text-xl font-medium">
            
            Query Builder
          </h1>
        </header>
        <div className="relative flex-grow">
          <QueryBuilder onSubmit={runQuery} graph={template?.query} />
        </div>
      </div>
    </div>
  );
};
