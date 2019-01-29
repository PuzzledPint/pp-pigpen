import { VariablesPipe } from '../../src/pipes/variables.pipe';

describe('Unit Test Variables Pipe', function() {
  it('replaces the year variable', function() {
    const s = 'ABC$yearDEF';
    const r = new VariablesPipe().transform(s);

    r.should('equal', 'ABC2019DEF');
  });
});

