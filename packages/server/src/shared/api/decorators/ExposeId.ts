import { Transform } from 'class-transformer';

const ExposeId = () => (target: Object, propertyKey: string) => {
  Transform((_, obj) => obj[propertyKey])(target, propertyKey);
};

export { ExposeId };
