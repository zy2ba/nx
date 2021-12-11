import {
  detectPackageManager,
  generateFiles,
  offsetFromRoot,
  toJS,
  Tree,
} from '@nrwl/devkit';
import { join } from 'path';
import { NormalizedSchema } from './normalize-options';

export function createApplicationFiles(host: Tree, options: NormalizedSchema) {
  generateFiles(host, join(__dirname, '../files'), options.appProjectRoot, {
    ...options,
    offsetFromRoot: offsetFromRoot(options.appProjectRoot),
    packageManager: detectPackageManager(host.root),
    easBuildPath: '/Users/expo/workingdir/build',
  });
  if (options.unitTestRunner === 'none') {
    host.delete(join(options.appProjectRoot, `App.spec.tsx`));
  }
  if (options.js) {
    toJS(host);
  }
}
