import chai from 'chai';
import chaiHttp from 'chai-http';
import { GitView } from './git-router';
import { app } from './index';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const expect = chai.expect;

chai.use(chaiHttp);

describe('GitView', () => {

    it('return an array of branches', async () => {
        const res = await chai.request(app).get('/api/v1/AutoxingTech/platform-build/branches');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Array').and.contains('master');
    });

    it('return an array of branches as TXT', async () => {
        const res = await chai.request(app).get('/api/v1/AutoxingTech/platform-build/branches?type=txt');
        expect(res).to.have.status(200);
        expect(res.text).to.be.an('String').and.matches(/master/);
    });

    it('return 404 not found', async () => {
        const res = await chai.request(app).get('/api/v1/AutoxingTech/xxx/branches');
        expect(res).to.have.status(404);
    });

});
