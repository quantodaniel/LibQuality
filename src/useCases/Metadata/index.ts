import { MetadataHandler } from "./handler";
import { MetadataController } from "./controller";

export function CreateMetadataController() {
  return new MetadataController();
}

export function CreateMetadataHandler() {
  const metadataController = CreateMetadataController();
  return new MetadataHandler(metadataController);
}
