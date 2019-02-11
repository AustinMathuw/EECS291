# Open On Demand JSON API Docs

API

## Important Info
NEEDED FOR ALL CALLS!
Get cookie from SSO
https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba

POST requests need an authenticity_token from the previous page, or session. Needed for Job Composer.

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

**Info:** See [here](https://stackoverflow.com/questions/10413803/getting-csrf-tokens-for-json-post-requests-to-a-rails-app) for a good explanation and how to put authenticity_token into json. Technically, this can be scrapped from any of the below requests if put in http response. TODO: Investigate an dedicated endpoint for this or update returned json to include this token.

### Get My Jobs

Path: `/pun/sys/myjobs`

Method: `GET`

Params: N/A

#### Description

Returns HTML that an application can scrape the authenticity_token. Temporary fix for the note in Job Composer

### Get Jobs

Path: `/pun/sys/myjobs/workflows.json`

Method: `GET`

Params: N/A

#### Description

Get the user's created jobs. Returns JSON array of jobs.

### Get Job by ID

Path: `/pun/sys/myjobs/workflows/<JOB_ID>.json`

Method: `GET`

Params: N/A

#### Description

Get the user's created job by id. Returns JSON object of job.

### Create Job with no Template

Path: `/pun/sys/myjobs/workflows.json`

Method: `POST`

Params: N/A

#### Description

Create a job based on no template. Returns JSON object of the job.

### Create Default Job

Path: `/pun/sys/myjobs/create_default.json`

Method: `POST`

Params: N/A

#### Description

Create a job based on the default template. Returns JSON object of the job.

### Create Job From Path

Path: `/pun/sys/myjobs/create_from_path.json`

Method: `POST`

Params: N/A

form-data: 
* `authenticity_token` - Required. See Job Composer info...
* `workflow[staging_template_dir]:<PATH_TO_SOURCE>` - Required
* `workflow[name]:<NAME_OF_JOB>`
* `workflow[batch_host]:<NAME_OF_CLUSTER>`
* `workflow[script_name]:<NAME_OF_SCRIPT>`
* `workflow[account]:<ACCOUNT>` - If not set, the account may be auto-set by the submit filter.

#### Description

Create a job based on a template at a specified path. Returns JSON object of the job.

### Copy Job

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/copy`

Method: `POST`

Params: N/A

#### Description

Create a job based on the default template. Returns JSON object of the job.

### Submit Job by ID

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/submit.json`

Method: `PUT`

Params: N/A

#### Description

Submit a job. Returns JSON object of the job deleted.

### Stop Job by ID

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/stop.json`

Method: `PUT`

Params: N/A

#### Description

Stop a job. Returns JSON object of the job deleted.

### Update Job by ID

Path: `/pun/sys/myjobs/workflows/<JOB_ID>.json`

Method: `PATCH/PUT`

Params: N/A

form-data: 
* `authenticity_token` - Required. See Job Composer info...
* `workflow[name]:<NAME_OF_JOB>`
* `workflow[batch_host]:<NAME_OF_CLUSTER>`
* `workflow[script_name]:<NAME_OF_SCRIPT>`
* `workflow[account]:<ACCOUNT>` - If not set, the account may be auto-set by the submit filter.

#### Description

Update a job. Returns JSON object of the job.

### Delete Job by ID

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/delete.json`

Method: `PUT`

Params: N/A

#### Description

Delete a job. Returns JSON object of the job deleted.