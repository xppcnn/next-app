import zod from "zod";

export default zod.object({
  name: zod.string().min(3),
  email: zod.string().email(),
  followers: zod.number().optional(),
  isActive: zod.boolean().optional(),
});
