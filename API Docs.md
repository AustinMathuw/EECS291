# Open On Demand JSON API Docs

## Important Info
NEEDED FOR ALL CALLS!
Get cookie from SSO
https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba

## API General Info
API HOST: https://ondemand.case.edu


## Active Jobs

Path: `/pun/sys/activejobs/json`

Params:
* `jobcluster=<all|cluster_id>`
* `jobfilter=<all|user_id>`

### Examples: 
* GET All Active Jobs on all clusters
`/pun/sys/activejobs/json?jobcluster=all&jobfilter=all`

* GET All Active Jobs on rider cluster
`/pun/sys/activejobs/json?jobcluster=smaster&jobfilter=all`

* GET All Active Jobs on user cluster
`/pun/sys/activejobs/json?jobcluster=all&jobfilter=user`

### Reference
Filters: https://github.com/OSC/ood-activejobs/blob/master/app/models/filter.rb

JSON Request Handler: https://github.com/OSC/ood-activejobs/blob/master/app/models/jobs_json_request_handler.rb

