import { celebrate, Segments, Joi } from "celebrate";

const MetadataValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    owner: Joi.string().required(),
    repo: Joi.string().required(),
  }),
});

export { MetadataValidator };
