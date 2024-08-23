import type { MetaFunction } from "@remix-run/node";
import {
  ClientLoaderFunction,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { EDGE_TYPES } from "~/components/query-builder/schema";
import QueryBuilder from "~/components/query-builder";
import postRobot from "post-robot"

export const meta: MetaFunction = () => {
  return [
    { title: "Query Builder" },
    { name: "description", content: "Rejuve.bio hypothesis generation" },
  ];
};

function  trialFunc(message:any){
  const targetOrigin = "http://127.0.0.1:8081/?tool_id=liftOver1&version=latest"
  console.log('in trialFunc')
  console.log(message)
  import("post-robot").then((postRobot) =>{

    postRobot.send(targetOrigin, 'getUser', { id: 1337 })
//     .then(function(event) {
//       // var user = event.data;
      
//       // console.log(event.source, event.origin, 'Got user:', user);

//       // Call the user.logout function from the other window!

//       // user.logout();
      
// }).catch(function(err) {

//     // Handle any errors that stopped our call from going through
    
//     console.error(err);
//   });
})
  // window.postMessage(message, '*')
  console.log(window)
  console.log(window.top)
  console.log(typeof(window.parent.postMessage))
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
    const resultGraph = "resulting graph"

    trialFunc({
      resultGraph
    })
    // navigate(`/annotation/${newAnnotationID}`);
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
