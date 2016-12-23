@servers(['web' => '104.131.71.95'])

@task('deploy')
    cd /path/to/site
    git pull origin master
@endtask
