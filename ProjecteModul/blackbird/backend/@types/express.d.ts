import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: any; // O especifica un tipo, como `User` si lo tienes definido
    }
  }
}