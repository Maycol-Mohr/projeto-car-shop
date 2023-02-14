import { NextFunction, Request, Response } from 'express';

function validateIdString(id: string) {
  if (id.length < 24 || id.length > 24) {
    const message = 'Invalid mongo id';
    return ({ status: 422, message });
  }
  return null;
}

export default function 
validatedMotorcycleId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  
  const error = validateIdString(id);
  
  if (error) return res.status(error.status).json({ message: error.message });
  
  next();
}