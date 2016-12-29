/**
 * Created by Tinti on 7/17/2016.
 */
var SERVER_IP = "http://developapi.nghilon.vn/francovietcareer.com/";
var SERVER = SERVER_IP + "api/";
var SERVER_ASSETS = SERVER_IP + "assets/";
//ADMIN
var SERVER_AGETPROFILES = SERVER + "agetProfiles";
var SERVER_AUPDATEUSERS = SERVER + "aupdateUsers";


var SERVER_GETCONFIG = SERVER + "getConfig";
var SERVER_SIGNIN = SERVER + "signin";
var SERVER_SIGNOUT = SERVER + "signout";
var SERVER_SIGNUP = SERVER + "signup";
var SERVER_GETUSER = SERVER + "getUser";
var SERVER_CHANGEPASSWORD = SERVER + "changePassword";
var SERVER_EDITCV = SERVER + "editCV";
var SERVER_GETCOUNTRIES = SERVER + "getCountries";
var SERVER_GETCITIESINCOUNTRY = SERVER + "getCitiesInCountry";
var SERVER_GETINDUSTRIES = SERVER + "getIndustries";
var SERVER_GETLANGUAGES = SERVER + "getLanguages";
var SERVER_GETSUGGESTSCHOOLS = SERVER + "getSuggestSchools";
var SERVER_GETSUGGESTCOMPANIES = SERVER + "getSuggestCompanies";
var SERVER_GETBASICPROFILE = SERVER + "getBasicProfile";
var SERVER_GETPROFILEABOUT = SERVER + "getProfileAbout";
var SERVER_EDITAVATAR = SERVER + "editAvatar";
var SERVER_EDITBASICINFO = SERVER + "editBasicInfo";
var SERVER_GETPOSTS = SERVER + "getPosts";
var SERVER_GETPHOTOS = SERVER + "getPhotos";
var SERVER_EDITPOST = SERVER + "editPost";
var SERVER_DELETEPOST = SERVER + "deletePost";
var SERVER_CHANGELIKE = SERVER + "changeLike";
var SERVER_ADDNEWCOMMENT = SERVER + "addNewComment";
var SERVER_ADDNEWPOST = SERVER + "addNewPost";
var SERVER_AGETCATEGORIES = SERVER + "agetCategories";
//App constant
var CONST_SERVER_TIMEOUT = 18000;
var LIMIT_PAGE = 15;

var CONST_DEGREE = [
    {
        id: 1,
        degree: 'High School'
    },
    {
        id: 2,
        degree: 'Associate’s Degree'
    },
    {
        id: 3,
        degree: 'Bachelor’s Degree'
    },
    {
        id: 4,
        degree: 'Master’s Degree'
    },
    {
        id: 5,
        degree: 'MBA'
    },
    {
        id: 6,
        degree: 'Doctor of Medicine (M.D)'
    },
    {
        id: 7,
        degree: 'Doctor of Philosophy (Ph.D)'
    },
    {
        id: 8,
        degree: 'Other'
    }
];
var CONST_ROLE = [
    {
        role: 'US1',
        name: 'Normal'
    },
    {
        role: 'HH1',
        name: 'Head hunter'
    },
    {
        role: 'HH2',
        name: 'VIP Head hunter'
    },
    {
        role: 'HH3',
        name: 'Premium Head Hunter'
    },
    {
        role: 'RE1',
        name: 'Recruiter'
    },
    {
        role: 'RE2',
        name: 'VIP Recruiter'
    },
    {
        role: 'JP1',
        name: 'Job Posting'
    },
    {
        role: 'JP2',
        name: 'VIP Job Posting'
    },
    {
        role: 'JP3',
        name: 'Premium Job Posting'
    },
    {
        role: 'AD1',
        name: 'Consultant'
    },
    {
        role: 'AD2',
        name: 'Consultant Manager'
    },
    {
        role: 'AD3',
        name: 'General Manager'
    },
    {
        role: 'BA1',
        name: 'Ban With Time'
    },
    {
        role: 'BA2',
        name: 'Ban Forever'
    }
];
var CONST_JOB_FUNCTION = [
    {
        value: 'Accounting/Finance',
        jf: 'Accounting/Finance'
    },
    {
        value: 'Admin/Clerical/Translator',
        jf: 'Admin/Clerical/Translator'
    },
    {
        value: 'Customer Service',
        jf: 'Customer Service'
    },
    {
        value: 'Design',
        jf: 'Design'
    },
    {
        value: 'Human Resources',
        jf: 'Human Resources'
    },
    {
        value: 'Import/Export',
        jf: 'Import/Export'
    },
    {
        value: 'IT/Technical',
        jf: 'IT/Technical'
    },
    {
        value: 'Legal',
        jf: 'Legal'
    },
    {
        value: 'Market Research',
        jf: 'Market Research'
    },
    {
        value: 'Marketing',
        jf: 'Marketing'
    },
    {
        value: 'Production/Process/RD',
        jf: 'Production/Process/R&D'
    },
    {
        value: 'Purchasing/Supply Chain',
        jf: 'Purchasing/Supply Chain'
    },
    {
        value: 'QA/QC',
        jf: 'QA/QC'
    },
    {
        value: 'Sales',
        jf: 'Sales'
    },
    {
        value: 'Trade Marketing',
        jf: 'Trade Marketing'
    },
    {
        value: 'Management',
        jf: 'Management'
    },
    {
        value: 'Other',
        jf: 'Other'
    }
];
