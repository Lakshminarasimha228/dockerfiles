ARG version
FROM almalinux:${version:-9}
ENV COURSE="DevOps" \
    DURATION="120HRS"
ARG TRAINER="Sivakumar"
ENV TRAINER=$TRAINER
RUN echo "hi, Course is :${COURSE}, duration is : ${DURATION}, trainer is : ${TRAINER}, version: ${version}"
CMD ["sleep", "1000"]