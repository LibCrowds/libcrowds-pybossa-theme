function pybossaLogError(err, showReportDialog=true){
    pybossaNotify('Error: ' + err.message, 'error');
    if (typeof Raven !== 'undefined' && Raven.isSetup()) {
        event_id = Raven.captureException(err);
        if (showReportDialog) {
            Raven.showReportDialog();
        }
    }
    throw err;
}
