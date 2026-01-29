// Zdefiniowanie schematu
const loginSchema = z.object({
  email: z.email().min(1).max(255),
  password: z.string().min(8).max(255),
  agent: z.string().max(255).optional(),
});

// Porównanie z danymi przesłanymi na serwer
const loginData = loginSchema.parse({
  email: req.body.email,
  password: req.body.password,
  agent: req.headers["user-agent"],
});
