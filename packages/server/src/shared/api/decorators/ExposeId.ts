import { Transform } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/ban-types
const ExposeId = () => (target: Object, propertyKey: string) => {
  Transform(({ obj }) => obj[propertyKey])(target, propertyKey);
};

export { ExposeId };
