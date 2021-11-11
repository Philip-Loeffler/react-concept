import React, { Component } from 'react';

class UserSubmissions extends Component {
 

// example of passing a function to a child component with an index that is handled on click in child
  resumeSurvey(index) {
    this.setState({ currentSubmissionIdx: index });
    let submission = this.state.submissions[index];
    if (submission.completed) {
      var json;
      api.get('questions').then((res) => {
        json = res.data;
        var stringified = JSON.stringify(json);
        stringified = stringified.replace(/\\\\n/g, '\\n');
        stringified = stringified.replace(/\\\//g, '/');
        json = JSON.parse(stringified);
        this.props.history.push({
          pathname: '/Results',
          state: { questions: json, responses: submission.submission ?? {} },
        });
      });
    } else {
      this.props.history.push({
        pathname: '/DesignAssistantSurvey',
        state: {
          prevResponses: submission.submission,
          submission_id: submission._id,
          filters: {
            roles: submission.roles,
            domain: submission.domain,
            region: submission.region,
            lifecycle: submission.lifecycle,
          },
        },
      });
    }
  }

//   example of passing a function to child without index 
  deleteSurvey() {
    let currentSubmissionIdx = this.state.currentSubmissionIdx;
    let submissions = this.state.submissions;
    let submission = submissions[currentSubmissionIdx];
    api.delete('submissions/delete/' + submission._id).then((response) => {
      submissions.splice(currentSubmissionIdx, 1);
      this.setState({ submissions: submissions });
    });
    this.setState({ showDeleteWarning: false });
  }


// the syntax below will make it so the function is not fired immedaitely when the component mounts.

  render() {
    const handleClose = () => this.setState({ showDeleteWarning: false });
      return (
        <div>
          <div>
              {/* here is what you put in the parent */}
                <AssessmentGrid
                  handleDelete={() => this.deleteSurvey()}
                  handleResume={(index) => this.resumeSurvey(index)}
                ></AssessmentGrid>
                <Box mt={4} />
              </div>
            </div>
            <Box mt={4} />
      );
    }
    // and in the child, this is how you would handle the function being called
        <div
            <DeleteRounded
              style={{ cursor: 'pointer' }}
              onClick={() => {
                handleDelete();
              }}
            />
          <AccountBox
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleResume(i);
            }}
          />
        </div>

  }
}

export default withRouter(UserSubmissions);
