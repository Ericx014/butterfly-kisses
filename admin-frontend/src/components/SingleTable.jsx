const SingleTable = ({uniqueDay, sessionToDisplay}) => {
	return (
    <section className="table-section">
      <div className="h3-container">
				<h3>{uniqueDay}</h3>
			</div>
      <div className="single-table-container">
				<table>
					<thead>
						<tr>
							<th className="time-cell">Time</th>
							<th className="session-cell">Session</th>
							<th className="name-cell">Name</th>
							<th className="id-cell">Student ID</th>
							<th className="contact-cell">Contact No.</th>
							<th className="email-cell">Email</th>
							<th className="gender-cell">Gender</th>
							<th className="age-cell">Age</th>
						</tr>
					</thead>
					<tbody>
						{sessionToDisplay.map((session, index) => {
							if (session.participants.length === 0) {
								return (
									<tr key={index}>
										<td>{session.time}</td>
										<td>{session.session}</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								);
							} else {
								return session.participants.map((participant, index) => (
									<tr key={index}>
										{index === 0 && (
											<td rowSpan={session.participants.length}>
												{session.time}
											</td>
										)}
										{index === 0 && (
											<td rowSpan={session.participants.length}>
												{session.session}
											</td>
										)}
										<td>{participant.name}</td>
										<td>{participant.studentId || "-"}</td>
										<td>{participant.contactNo}</td>
										<td>{participant.email}</td>
										<td>{participant.gender}</td>
										<td>{participant.age}</td>
									</tr>
								));
							}
						})}
					</tbody>
				</table>
			</div>
    </section>
  );
}

export default SingleTable;