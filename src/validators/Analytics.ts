import { celebrate, Segments, Joi } from "celebrate";

const AnalyticsValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    q: Joi.string().required(),
  }),
});

export { AnalyticsValidator };
