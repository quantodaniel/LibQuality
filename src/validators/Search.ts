import { celebrate, Segments, Joi } from "celebrate";

const SearchValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
  }),
});

export { SearchValidator };
