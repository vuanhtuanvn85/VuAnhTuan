import { Request, Response } from 'express';
import { createResource, getAllResources, getResourceById, updateResource, deleteResource } from '../models/resourceModel';

export async function createResourceHandler(req: Request, res: Response) {
  const resource = await createResource(req.body);
  res.status(201).json(resource);
}

export async function getAllResourcesHandler(req: Request, res: Response) {
  const resources = await getAllResources();
  res.json(resources);
}

export async function getResourceByIdHandler(req: Request, res: Response) {
  const resource = await getResourceById(parseInt(req.params.id));
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send('Resource not found');
  }
}

export async function updateResourceHandler(req: Request, res: Response) {
  const resource = await updateResource(parseInt(req.params.id), req.body);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send('Resource not found');
  }
}

export async function deleteResourceHandler(req: Request, res: Response) {
  const resource = await deleteResource(parseInt(req.params.id));
  res.status(204).send(resource);
}
