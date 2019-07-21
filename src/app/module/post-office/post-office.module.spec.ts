import { PostOfficeModule } from './post-office.module';

describe('PostOfficeModule', () => {
  let postOfficeModule: PostOfficeModule;

  beforeEach(() => {
    postOfficeModule = new PostOfficeModule();
  });

  it('should create an instance', () => {
    expect(postOfficeModule).toBeTruthy();
  });
});
