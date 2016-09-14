function pybossaLogError(message, showReportDialog){
    pybossaNotify('Error: ' + message, 'error');
    if (typeof Raven !== 'undefined' && Raven.isSetup()) {
        Raven.captureException(message);
        if (showReportDialog) {
            Raven.showReportDialog();
        }
    }
    throw new Error(message);
}
