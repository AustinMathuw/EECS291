# OpenOnDemand API Dashboard

## Table of contents
1. [Introduction](#intro)
2. [Replication](#replication)
3. [Next Steps](#next)
4. [References](#refs)

## Introduction <a name="intro"></a>

Over the course of the spring semester of 2019, I did research on OpenOnDemand and found an way to extend the platform without having to be constrained to their [Interactive Apps](https://osc.github.io/ood-documentation/master/app-development/interactive/setup.html). By digging into the OpenOnDemand GitHub, I learned of a RESTful API the was buried in the Ruby code of the webserver. There are endpoints for both the Active Jobs and the Job Composer modules of the [OpenOnDemand Platform](https://osc.github.io/ood-documentation/master/index.html).

In this repository, you will find [documentation](https://github.com/AustinMathuw/EECS291/blob/master/API%20Docs.md) for all the endpoints, as well as a partial [implementation](https://github.com/AustinMathuw/EECS291/tree/master/HPCC%20Dashboard) of these endpoints.

In the example implementation, the functional javascript is located in ["HPCC Dashboard/js/demo/dashboard.js"](https://github.com/AustinMathuw/EECS291/blob/master/HPCC%20Dashboard/js/demo/dashboard.js). The javascript preforms a call to `/js/data.json` which is a json file containing the response of a call made to the GET Jobs endpoint previously. The reasoning for this is that, at the time of this writing, I am still awaiting permission to use proxy login with Case's [CAS Single Sign In](https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba) platform. See the [Next Steps](#next) section to see how to integrate the real API call into the HPCC Dashboard.

## Replication <a name="replication"></a>

Before you proceeded to replicate, note that the general dashboard was created using an admin theme provided located [here](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2).

1. If git is not installed on your system, install from [here](https://git-scm.com/downloads). You only need the command line installation for our purposes.
2. Install Node.js, if not already installed, from [here](https://nodejs.org/en/download/).
3. Clone this repository to a known folder on you machine. To do this, navigate to the desired folder on your machine in a terminal and run the following command: 

`git clone https://github.com/AustinMathuw/EECS291.git`

4. Open the project in a code editor of your choice (VS Code, Notepad++, etc.).

5. Open a terminal to the local repository change directory to HPCC Dashboard.

`cd "HPCC Dashboard"`

6. In the terminal, run `npm install` to install all of the NodeJS dependencies for the project.

7. Next, run the following command to enable browser-sync and allow live viewing of changes made to the project:

`gulp watch`

Gulp documentation specific to this project can be found [here](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2#gulp-tasks).

8. That's it! Feel free to extend the project to your specific purposes using the resources found in the [References](#refs) section!

## Next Steps <a name="next"></a>

A critical next step for this project is hooking up the Dashboard to the OpenOnDemand API via proxy login with Case's [CAS Single Sign In](https://case.edu/utech/help/knowledge-base/cwru-network-id-password/cas-single-sign-on-at-cwru-kba) platform.

Some other next steps include adding the job composer functionalities or some analytics for the running jobs.

## References <a name="refs"></a>

- [OpenOnDemand GitHub](https://osc.github.io/ood-documentation/master/index.html)
  - Search "json" in repository to find relevant files.