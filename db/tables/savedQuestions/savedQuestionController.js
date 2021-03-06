var Models = require('../../schema.js');

exports.getQuestions = (req, res) => {
  Models.connection.query(
    `SELECT
      *
    FROM
      saved_questions AS sq
    WHERE
      presentation_code = '${req.params.presentationCode}'`,
    {type: Models.connection.QueryTypes.SELECT}
  ).then(function(data) {
    res.send(data);
  });
};

exports.postQuestions = (req, res) => {
  Models.SavedQuestions.build({
    'presentation_code': req.body.presentationCode,
    'title': req.body.title,
    'question_type': req.body.questionType,
    'graph_type': req.body.graphType,
    'choices': req.body.choices
  }).save();
};

exports.getRooms = (req, res) => {
  Models.connection.query(
    `SELECT
      DISTINCT presentation_code
    FROM
      saved_questions AS sq`,
    {type: Models.connection.QueryTypes.SELECT}
  ).then(function(data) {
    res.send(data);
  });
};
