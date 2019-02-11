# Open On Demand JSON API Docs

API

## Important Info
NEEDED FOR ALL CALLS!
Get cookie from SSO
https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba

POST requests need an authenticity_token from the previous page, or session. Needed for Job Composer

## API General Info
API HOST: https://ondemand.case.edu


## Active Jobs

### Get Jobs

Path: `/pun/sys/activejobs/json`

Method: `GET`

Params:
* `jobcluster=<all|cluster_id>`
* `jobfilter=<all|user_id>`

#### Examples: 
* GET All Active Jobs on all clusters
`/pun/sys/activejobs/json?jobcluster=all&jobfilter=all`

* GET All Active Jobs on rider cluster
`/pun/sys/activejobs/json?jobcluster=smaster&jobfilter=all`

* GET All Active Jobs on user cluster
`/pun/sys/activejobs/json?jobcluster=all&jobfilter=user`

#### Reference
Filters: https://github.com/OSC/ood-activejobs/blob/master/app/models/filter.rb

JSON Request Handler: https://github.com/OSC/ood-activejobs/blob/master/app/models/jobs_json_request_handler.rb

## Job Composer

### Get My Jobs

Path: `/pun/sys/myjobs`

Method: `GET`

Params: N/A

#### Description

Returns HTML where an application can scrape the authenticity_token. See [here](https://stackoverflow.com/questions/10413803/getting-csrf-tokens-for-json-post-requests-to-a-rails-app) for a good explanation and how to put into json. Technically, this can be scrapped from any of the below requests. TODO: Investigate an dedicated endpoint for this.

### Get Workflows

Path: `/pun/sys/myjobs/workflows.json`

Method: `GET`

Params: N/A

#### Description

Get the user's created workflows. Returns JSON array of jobs.

### Create Default Job

Path: `/pun/sys/myjobs/create_default.json`

Method: `POST`

Params: N/A

#### Description

Create a job based on the default template. Returns JSON object of the job.

