function pybossaLogError(message, showReportDialog=true){
    var err = new Error(message);
    pybossaNotify('Error: ' + message, 'error');
    if (typeof Raven !== 'undefined' && Raven.isSetup()) {
        event_id = Raven.captureException(err);
        if (showReportDialog) {
            Raven.showReportDialog();
        }
    }
    throw err;
}
