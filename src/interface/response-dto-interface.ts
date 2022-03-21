import { FrequentFlyerModelInterface } from './frequent-flyer-model-interface';

export interface ResponseDtoInterface {
  message: string;
  code: string;
  clubMember?: FrequentFlyerModelInterface;
}
