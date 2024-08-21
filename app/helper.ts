/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";
const LOCAL_STORAGE_KEY_HYPOTHESES = "hypotheses";
const LOCAL_STORAGE_KEY_ANNOTATIONS = "annotations";

export function getHypthesesFromLocalStorage(): HypothesisData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_HYPOTHESES);
  return data ? JSON.parse(data) : [];
}

export function findHypthesesFromLocalStorage(id: string) {
  const hypotheses = getHypthesesFromLocalStorage();
  return hypotheses.find((h) => h.id === id) || null;
}

export function addHypothesisToLocalStorage(
  hypothesis: Partial<HypothesisData>
): string {
  if (typeof window === "undefined") throw "Couldn't save hypothesis";
  const hypotheses = getHypthesesFromLocalStorage();
  const id = uuidv4();
  localStorage.setItem(
    LOCAL_STORAGE_KEY_HYPOTHESES,
    JSON.stringify([
      ...hypotheses,
      {
        ...hypothesis,
        id,
        created_on: new Date(),
      },
    ])
  );
  return id;
}

export function getAnnotationsFromLocalStorage(): any {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_ANNOTATIONS);
  return data ? JSON.parse(data) : [];
}

export function addAnnotationToLocalStorage(annotation: any): string {
  if (typeof window === "undefined") throw "Couldn't save annotation";
  const annotations = getAnnotationsFromLocalStorage();
  const id = uuidv4();
  localStorage.setItem(
    LOCAL_STORAGE_KEY_ANNOTATIONS,
    JSON.stringify([
      ...annotations,
      {
        ...annotation,
        id,
        created_on: new Date(),
      },
    ])
  );
  return id;
}

export function findAnnotationFromLocalStorage(id: string) {
  const hypotheses = getAnnotationsFromLocalStorage();
  return hypotheses.find((a: { id: string; }) => a.id === id) || null;
}

export function saveGraphForHypothesis(
  hypothesisId: string,
  goID: string,
  graph: HypothesisGraph
) {
  if (typeof window === "undefined") throw "Couldn't save hypothesis graph";
  localStorage.setItem(`${hypothesisId}-${goID}`, JSON.stringify(graph));
}

export function getGraphForHypothesis(hypothesisId: string, goID: string) {
  if (typeof window === "undefined") throw "Couldn't get hypothesis graph";
  const data = localStorage.getItem(`${hypothesisId}-${goID}`);
  return data ? JSON.parse(data) : null;
}
