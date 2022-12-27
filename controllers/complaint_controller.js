import Complaint_model from "../models/complaint.js";
import Counter_model from "../models/Counter.js";
import Users_model from "../models/user.js";

async function getComplaints(req, res) {
  try {
    let data2 = await Complaint_model.find();
    res.send(data2);
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

async function getComplaint(req, res) {
  try {
    let { cno } = req.params;
    const data2 = await Complaint_model.find({C_no:cno });
    console.log(data2, "name");
    res.status(200).json(data2);
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

async function createComplaint(req, res) {
  try {
    Counter_model.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true },
      (err, cd) => {
        let seqId;
        if (cd == null) {
          const newval = new Counter_model({ id: "autoval", seq: 99 });
          newval.save();
          seqId: 99;
        } else {
          seqId = cd.seq;
        }
        let d = new Date();
        const data = new Complaint_model({
          file_date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
          C_no: seqId,
          person: req.body.person,
          complainant: req.body.complainant,
          wing: req.body.wing,
          wing_branch: req.body.wing_branch,
          Date_time: req.body.Date_time,
          Location: req.body.Location,
          description: req.body.description,
          contact: req.body.contact,
        });
        data.save();
        res.end();
      }
    );
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

// async function updateComplaint(req, res) {
//   try {
//     let { cno } = req.params;
//     let data2 = await Complaint_model.updateOne({ cno }, { $set: req.body });
//     res.end();
//   } catch (error) {
//     console.log("error:", error.message);
//     res.send(`eeror:${error.message}`);
//   }
// }
async function updateComplaintStatus(req, res) {
  const status = req.body.status;
  let { cno } = req.params;
  console.log(cno)
  console.log(status);
  Complaint_model.updateOne({C_no: cno},{$set:{ complaint_status: status }}).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error.message
      });
    }
  );
}

async function deleteComplaint(req, res) {
  try {
    let { _id } = req.params;
    let data2 = await Complaint_model.deleteOne({ _id }, { $set: req.body });
    res.end();
  } catch (error) {
    console.log("error:", error.message);
    res.send(`eeror:${error.message}`);
  }
}

export {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  updateComplaintStatus
};
