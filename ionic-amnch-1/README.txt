AMNCH IONIC APP

This is the start of an AMNCH App for Shift Handover.

It requires the following APIs:

/api/login

    params: user, pw 
    action: should log the user in and establish a cookie based session
            only doctors and admin user can login
            
            {
            	success: true | false,
                name:  name to display
                role:  role to display
            }
    
/api/handover/consultants

    params: none
    action: return the list of consultants that can be inserted into a select
    
    	[
			[id, name]        
        ]
        	
    
/api/handover/notes

	params: consultant id
    action: return a list of patients and their notes
    security:  only doctors and admin user can retrieve the data

	[
    	{
        	mrn
            visit id
            name
            dateofbirth
            admission date?
            gender?
            location?
            note {
            	recorded_by
                recorded_date
                note
            }
        }
    ]
    