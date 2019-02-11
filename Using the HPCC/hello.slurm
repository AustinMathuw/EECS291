#!/bin/sh
#SBATCH --nodes=1
#SBATCH --cpus-per-task=4  # 4 cores
#SBATCH --time=0-00:05:00  # 5 minutes
#SBATCH --output=my_output.txt 

cp hello.c $PFSDIR/.
cd $PFSDIR
gcc hello.c -o hello
./hello
