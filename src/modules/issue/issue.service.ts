import pool from "../../config/bd.js";
import type { IIssue } from "./issue.interface.js";


const createIssueIntoDB = async (data: IIssue, user: any) => {
    const {title,description,type} = data;
    const allowedType = ["bug", "feature_request"];
    if (!allowedType.includes(type)) {
        throw new Error("Type are not allow , Write a valid type")
    };
    const result = await pool.query(`
            INSERT INTO issues(title,description,type,reporter_id)
            VALUES($1,$2,$3,$4)
            RETURNING *
            `, [title, description, type,user?.id]);
    return result.rows[0];
    
};


const getAllIssueFromDB = async (query:any) => {
    const { type, status, sort = 'newest' } = query;
    console.log(type, status)
    
    //Create base query and array for dynamic params
    let queryText = 'SELECT * FROM issues';
    const queryParams: (string | undefined)[] = [];
    const whereCondition:(string | undefined)[] = [];


    //Check: params exists or not
    if (type) {
        queryParams.push(type);
        whereCondition.push(`type = $${queryParams.length}`);
    };

    if (status) {
        queryParams.push(status);
        whereCondition.push(`status = $${queryParams.length}`);
    }

    if (whereCondition.length > 0) {
        queryText += ' WHERE ' + whereCondition.join(' AND ');
    }

    //sorting : Default newest
    if (sort === 'oldest') {
        queryText += ' ORDER BY created_at ASC'
    } else {
        queryText += ' ORDER BY created_at DESC';
    }

    console.log(queryText)
    
    const result = await pool.query(queryText, queryParams);
    const issues = result.rows;

    //Unique reporter id
    const reporterIds = [...new Set(issues.map(issue => issue.reporter_id))];

    // fetch reporter data from database
    const reporterData = await pool.query(`
        SELECT id,name,role FROM users
        WHERE id = ANY($1)
        `, [reporterIds]);
    const reporters = reporterData.rows;

    //convert to object
    const reporterMap:any = {};
    reporters.forEach(reporter => {
        reporterMap[reporter.id] = {
            id: reporter?.id,
            name: reporter?.name,
            role: reporter?.role
        }
    });

    //Formatting data 
    const formattedData = issues.map(issue => {
        const { reporter_id, ...issueData } = issue;
        issueData["reporter"] = reporterMap[reporter_id] || null;
        return issueData
    })
    
    return formattedData
}


const getSingleIssueFromDB = async (id: (string)) => {
    console.log(id);
    const result = await pool.query(`
        SELECT * FROM issues
        WHERE id = $1
        `, [id]);
    if (result.rows.length === 0) {
        throw new Error('This issue cannot exist')
    };
    const issue = result.rows[0];

    //fetch reporter data
    const reporterData = await pool.query(`
        SELECT id,name,role FROM users
        WHERE id = $1
        `, [issue?.reporter_id]);
    const reporter = reporterData.rows[0];

    //formate data 
    const { reporter_id, ...issueData } = issue;
    issueData
    if (reporterData.rows.length === 0) {
        issueData['reporter'] = {
            message:'This reporter is not exist in the server'
        }
    }
    issueData['reporter'] = {
        id: reporter?.id,
        name: reporter?.name,
        role: reporter?.role
    };
    return issueData
};


const deleteIssueFromDB = async (id: string) => {
    

    const result = await pool.query(`
        DELETE FROM issues
        WHERE id = $1
        `, [id]);
    if (result.rowCount === 0) {
        throw new Error('Failed to delete . Please try again')
    }
    return result
};

export const issueService = {
    createIssueIntoDB,
    getAllIssueFromDB,
    getSingleIssueFromDB,
    deleteIssueFromDB
}