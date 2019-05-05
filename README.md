# OpenOnDemand API Dashboard

## Table of contents
1. [Introduction](#intro)
2. [Replication](#replication)
3. [Next Steps](#next)
4. [Refrences](#refs)

## Introduction <a name="intro"></a>

Over the course of the spring semester of 2019, I did research on OpenOnDemand and found an way to extend the platfrom without having to be constrained to their [Interactive Apps](https://osc.github.io/ood-documentation/master/app-development/interactive/setup.html). By digging into the OpenOnDemand GitHub, I learned of a RESTful API the was buried in the Ruby code of the webserver. There are endpoints for both the Active Jobs and the Job Composer modules of the [OpenOnDemand Platform](https://osc.github.io/ood-documentation/master/index.html).

In this repository, you will find [documentation](https://github.com/AustinMathuw/EECS291/blob/master/API%20Docs.md) for all the endpoints, as well as a partial [implementation](https://github.com/AustinMathuw/EECS291/tree/master/HPCC%20Dashboard) of these endpoints.

In the example implementation, the functional javascript is located in ["HPCC Dashboard/js/demo/dashboard.js"](https://github.com/AustinMathuw/EECS291/blob/master/HPCC%20Dashboard/js/demo/dashboard.js). The javascript preforms a call to `/js/data.json` which is a json file containing the response of a call made to the GET Jobs endpoint previously. The resoning for this is that, at the time of this writing, I am still awaiting permission to use proxy login with Case's [CAS Single Sign In](https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba) platform. See the [Next Steps](#next) section to see how to integrate the real API call into the HPCC Dashboard.

## Replication <a name="replication"></a>

Before you proceeded to replicate, note that the general dashboard was created using an admin theme provided located [here](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2).

1. If git is not installed on your system, install from [here](https://git-scm.com/downloads). You only need the command line installation for our purposes.
2. Clone this repository to a known folder on you machine. To do this, navigate to the desired folder on your machine in a terminal and run the following command: 

`git clone https://github.com/AustinMathuw/EECS291.git`

3. Open the project in a code editor of your choice (VS Code, Notepad++, etc.)

4. 

## Next Steps <a name="next"></a>



## Refrences <a name="refs"></a>

- [OpenOnDemand GitHub](https://osc.github.io/ood-documentation/master/index.html)
  - Search "json" in respository to find relavent files.