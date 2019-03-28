# OpenOnDemand JSON API Docs

# Table of contents
1. [Introduction](#introduction)
2. [Important Info](#paragraph1)
3. [API General Info](#paragraph2)
4. [Active Jobs](#activejobs)
    * [Get All Jobs](#getjobs)
5. [Job Composer](#jobcomposer)
    * [Get My Jobs](#getmyjobs)
    * [Get User Jobs](#getuserjobs)
    * [Get Job by ID](#getjobid)
    * [Create Job without Template](#createjobnotemplate)
    * [Create Default Job](#createdefaultjob)
    * [Create Job from Template Path](#createjobfrompath)
    * [Copy Job](#copyjob)
    * [Submit Job by ID](#submitjobbyid)
    * [Stop Job](#stopjob)
    * [Update Job](#updatejob)
    * [Delete Job by ID](#deletejobbyid)
    * [Create Job Template](#createjobtemplate)
    * [Delete Job Template](#deletejobtemplate)

## Introduction <a name="introduction"></a>
This documentation was created to expose OpenOnDemand to allow for developers to create better standalone applications. This will help researchers test and analyze their research tests using the HPCC.

## Important Info <a name="imprtinfo"></a>
NEEDED FOR ALL CALLS!
Get cookie from SSO
https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba

POST requests need an authenticity_token from the previous page, or session. Needed for Job Composer.

## API General Info <a name="geninfo"></a>
API HOST: https://ondemand.case.edu

## Active Jobs <a name="activejobs"></a>

### Get Jobs <a name="getjobs"></a>

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

## Job Composer <a name="jobcomposer"></a>

#### Info
 See [here](https://stackoverflow.com/questions/10413803/getting-csrf-tokens-for-json-post-requests-to-a-rails-app) for a good explanation and how to put authenticity_token into json. Technically, this can be scrapped from any of the below requests if put in http response. TODO: Investigate an dedicated endpoint for this or update returned json to include this token.

#### Refrence 
https://github.com/OSC/ood-myjobs/search?q=json&unscoped_q=json

### Get My Jobs <a name="getmyjobs"></a>

Path: `/pun/sys/myjobs`

Method: `GET`

Params: N/A

#### Description

Returns HTML that an application can scrape the authenticity_token. Temporary fix for the note in Job Composer

### Get Jobs <a name="getuserjobs"></a>

Path: `/pun/sys/myjobs/workflows.json`

Method: `GET`

Params: N/A

#### Description

Get the user's created jobs. Returns JSON array of jobs.

### Get Job by ID <a name="getjobid"></a>

Path: `/pun/sys/myjobs/workflows/<JOB_ID>.json`

Method: `GET`

Params: N/A

#### Description

Get the user's created job by id. Returns JSON object of job.

### Create Job with no Template <a name="createjobnotemplate"></a>

Path: `/pun/sys/myjobs/workflows.json`

Method: `POST`

Params: N/A

#### Description

Create a job based on no template. Returns JSON object of the job.

### Create Default Job <a name="createdefaultjob"></a>

Path: `/pun/sys/myjobs/create_default.json`

Method: `POST`

Params: N/A

#### Description

Create a job based on the default template. Returns JSON object of the job.

### Create Job From Path <a name="createjobfrompath"></a>

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

### Copy Job <a name="copyjob"></a>

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/copy`

Method: `POST`

Params: N/A

#### Description

Create a job based on the default template. Returns JSON object of the job.

### Submit Job by ID <a name="submitjobbyid"></a>

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/submit.json`

Method: `PUT`

Params: N/A

#### Description

Submit a job. Returns JSON object of the job deleted.

### Stop Job by ID <a name="stopjob"></a>

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/stop.json`

Method: `PUT`

Params: N/A

#### Description

Stop a job. Returns JSON object of the job deleted.

### Update Job by ID <a name="updatejob"></a>

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

### Delete Job by ID <a name="deletejobbyid"></a>

Path: `/pun/sys/myjobs/workflows/<JOB_ID>/delete.json`

Method: `PUT`

Params: N/A

#### Description

Delete a job. Returns JSON object of the job deleted.

### Create Job Template <a name="createjobtemplate"></a>

Path: `/pun/sys/myjobs/templates.json`

Method: `POST`

Params: N/A

form-data: 
* `authenticity_token` - Required. See Job Composer info...
* `workflow[path]:<PATH_TO_SOURCE>` - Required. The template will be created by copying files from this source path
* `workflow[name]:<NAME_OF_JOB>` - Required
* `workflow[batch_host]:<NAME_OF_CLUSTER>` - Required
* `workflow[script_name]:<NAME_OF_SCRIPT>` - Required. The job script.
* `workflow[notes]:<ACCOUNT>` - Note appear in the manifest.yml located in the created template's directory

#### Description

Creates a template that can be used to create jobs. Returns template as JSON object.

### Delete Job Template <a name="deletejobtemplate"></a>

Path: `/pun/sys/myjobs/templates/<TEMPLATE_ID>.json`

Method: `DELETE`

Params: N/A

#### Description

Deletes a job template. Returns template as JSON object.