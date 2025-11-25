import ReportTable from "../../components/ReportTable"
import AlarmReportTable from "../../components/AlarmReportTable"

function ReportsPage() {
    return (
        <div className="w-full pb-10">
            <div className="mb-8">
                <ReportTable />
            </div>

            <div>
                <AlarmReportTable />
            </div>
        </div>
    )
}

export default ReportsPage
