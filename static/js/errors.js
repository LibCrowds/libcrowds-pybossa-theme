function pybossaLogError(message, showReportDialog=true){
    pybossaNotify('Error: ' + message, 'error');
    if (typeof Raven !== 'undefined' && Raven.isSetup()) {
        event_id = Raven.captureException(message);
        if (showReportDialog) {
            console.log(Raven.showReportDialog());
        }
    }
    throw new Error(message);
}
