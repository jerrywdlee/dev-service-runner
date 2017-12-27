'use strict';

const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const runner_cmd = 'node dev_service.js test/dev-service.test.yml';

describe('Test run success', () => {
  let cmd_results = [];

  before(async () => {
    const { stdout, stderr } = await exec(runner_cmd);
    cmd_results = stdout.toString().trim().split('\n');
  });

  it('Should run Proc1', () => {
    const proc_res = cmd_results.filter(res => /^\[Proc1\]/.test(res));
    assert(proc_res[0] === '[Proc1] Start Proc1');
    assert(proc_res[proc_res.length - 1] === '[Proc1] exited with code 0');
    for (let i = 1; i < proc_res.length - 1; i++) {
      assert(proc_res[i] === `[Proc1] i = ${i - 1}`);
    }
  });

  it('Should run Proc2', () => {
    const proc_res = cmd_results.filter(res => /^\[Proc2\]/.test(res));
    assert(proc_res[0] === '[Proc2] Start Proc2');
    assert(proc_res[proc_res.length - 1] === '[Proc2] exited with code 0');
    assert(proc_res[1] === '[Proc2] Argument: --argv=abc');
  });

  it('Should show error at Proc3', () => {
    const proc_res = cmd_results.filter(res => /^\[Proc3\]/.test(res));
    assert(proc_res[0] === '[Proc3] Start Proc3');
    assert(proc_res[proc_res.length - 1] === '[Proc3] exited with code 1');
    assert(proc_res.includes('[Proc3] Error: Proc3'));
  });
});

/*
describe('Test run failed', () => {
  let runner_cmd = 'node dev_service.js dev-service.notexist.yml';
  let cmd_results = '';

  before(async function(done) {
    this.timeout(5000)
    try {
      const { stdout, stderr } = await exec(runner_cmd);
      // console.log(stdout, stderr);
    } catch (error) {
      cmd_results = error.stdout.toString();
    }
  });

  it('Should show error message', () => {
    assert(cmd_results.includes('Failed!'));
  });
});
*/