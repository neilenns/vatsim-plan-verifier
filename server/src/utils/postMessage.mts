import { parentPort } from "node:worker_threads";

export default function postMessage(message: string): boolean {
  if (parentPort) parentPort.postMessage(message);

  return parentPort !== null;
}
