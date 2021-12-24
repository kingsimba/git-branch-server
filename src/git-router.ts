import express from 'express';
import child_process from 'child_process';
import util from 'util';
import { HttpError, InternalServerError, NotFoundError } from './errors';

const exec = util.promisify(child_process.exec);

export class GitView {

    static async branches(repo: string): Promise<string[] | HttpError> {
        const cmd = `git ls-remote --heads ${repo}`;
        try {
            const branches = []
            const { stdout, stderr } = await exec(cmd);
            const lines = stdout.split(/\r?\n/);
            for (const line of lines) {
                const m = line.match(/.*\s+refs\/heads\/(.*)$/);
                if (m) {
                    branches.push(m[1])
                }
            }
            return branches
        }
        catch (_e) {
            const e = _e as { code: number, stderr: string };
            if (e.code == 128 && e.stderr.search("Repository not found") != -1) {
                return new NotFoundError(e.stderr);
            }
            else {
                return new InternalServerError(e.stderr);
            }
        }
    }
}

// Create a sub-router
export const gitRouter = express.Router();

gitRouter.get('/repos/:user/:repo/branches', async (req: { params: { user: string, repo: string }, query: { type: string } }, res) => {
    const branches = await GitView.branches(`git@github.com:${req.params.user}/${req.params.repo}`);
    if (branches instanceof HttpError) {
        res.status(branches.status).send({ "error": branches.message });
    } else {
        if (req.query?.type === "txt") {
            res.send(branches.join("\n"));
        }
        else {
            res.send(branches);
        }
    }
});
