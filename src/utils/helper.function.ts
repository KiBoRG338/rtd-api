import { PM_ROLE, DEVELOPER_ROLE, QA_ROLE, NEW_STATUS, IN_PROGRESS_STATUS, DONE_STATUS } from "./enum.constants"

export function getDefaultCompanyRoles({companyId}){
    const roles = [
        { title: PM_ROLE, companyId }, 
        { title: DEVELOPER_ROLE, companyId}, 
        { title: QA_ROLE, companyId }
    ];
    return roles;
}

export function getDefaultCompanyStatuses({companyId}){
    const statuses = [
        { title: NEW_STATUS, companyId},
        { title: IN_PROGRESS_STATUS, companyId},
        { title: DONE_STATUS, companyId}
    ];
    return statuses;
}