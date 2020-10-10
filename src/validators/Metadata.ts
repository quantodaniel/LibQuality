import { celebrate, Segments, Joi } from "celebrate";

const MetadataValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
  }),
});

export { MetadataValidator };
