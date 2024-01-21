import { parentPort } from "node:worker_threads";

export default function postMessage(message: string) {
  if (parentPort) parentPort.postMessage(message);
}
